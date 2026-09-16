import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as SQLite from 'expo-sqlite';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';
import ConfirmModal from '../components/ConfirmModal';

export default function ProfileScreen({ route, navigation }) {
  const { user } = route.params || {};
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const executeLogout = () => {
    setLogoutModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const handleExportCSV = async () => {
    if (!user?.id) {
      Toast.show({
        type: 'error',
        text1: 'Gagal Ekspor',
        text2: 'Identitas pengguna tidak ditemukan.',
      });
      return;
    }

    setIsExporting(true);
    try {
      const db = await SQLite.openDatabaseAsync('monga.db');
      const transactions = await db.getAllAsync(
        'SELECT transaction_date, type, amount, description FROM transactions WHERE user_id = ? ORDER BY transaction_date DESC',
        [user.id]
      );

      if (!transactions || transactions.length === 0) {
        Toast.show({
          type: 'info',
          text1: 'Data Kosong',
          text2: 'Belum ada transaksi untuk diekspor.',
        });
        setIsExporting(false);
        return;
      }

      const csvHeader = 'Tanggal,Tipe,Nominal,Keterangan\n';
      const csvBody = transactions
        .map((item) => {
          const typeLabel = item.type === 'income' ? 'Pemasukan' : 'Pengeluaran';
          const safeDesc = (item.description || '').replace(/"/g, '""');
          return `${item.transaction_date},${typeLabel},${item.amount},"${safeDesc}"`;
        })
        .join('\n');

      const csvContent = csvHeader + csvBody;

      // Menggunakan File & Paths API modern bawaan expo-file-system
      const file = new File(Paths.document, `MonGa${Date.now()}.csv`);
      file.create();
      file.write(csvContent);

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Toast.show({
          type: 'error',
          text1: 'Fitur Tidak Didukung',
          text2: 'Perangkat tidak mendukung pembagian berkas.',
        });
        setIsExporting(false);
        return;
      }

      await Sharing.shareAsync(file.uri, {
        mimeType: 'text/csv',
        dialogTitle: 'Simpan Laporan Transaksi MonGa',
        UTI: 'public.comma-separated-values-text',
      });

      Toast.show({
        type: 'success',
        text1: 'Ekspor Berhasil',
        text2: 'File CSV siap disimpan atau dibagikan.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Ekspor Gagal',
        text2: error.message,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-50 p-6 items-center">
      <View className="w-24 h-24 bg-sky-100 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm mt-8">
        <Ionicons name="person" size={40} color="#0284c7" />
      </View>

      <Text className="text-slate-800 text-2xl font-bold mb-1">
        {user?.username ? user.username.toUpperCase() : 'PENGGUNA'}
      </Text>
      <Text className="text-slate-500 text-sm mb-8 font-medium">Pengguna MonGa</Text>

      {/* MENU GRID: KEAMANAN & BANTUAN */}
      <View className="w-full flex-row justify-between mb-4">
        <TouchableOpacity 
          className="flex-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm mr-2 active:bg-slate-50"
          onPress={() => navigation.navigate('ChangePassword', { user })}
        >
          <View className="w-10 h-10 bg-indigo-50 rounded-full items-center justify-center mb-3">
            <Ionicons name="shield-checkmark" size={20} color="#0284c7" />
          </View>
          <Text className="text-slate-800 font-bold text-base mb-1">Keamanan</Text>
          <Text className="text-slate-500 text-xs">Atur PIN & Sandi</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm ml-2 active:bg-slate-50"
          onPress={() => navigation.navigate('FAQScreen', { user })}
        >
          <View className="w-10 h-10 bg-sky-50 rounded-full items-center justify-center mb-3">
            <Ionicons name="help-circle" size={24} color="#0284c7" />
          </View>
          <Text className="text-slate-800 font-bold text-base mb-1">Bantuan</Text>
          <Text className="text-slate-500 text-xs">FAQ & Dukungan</Text>
        </TouchableOpacity>
      </View>

      {/* MENU BARIS: EKSPOR CSV */}
      <TouchableOpacity
        onPress={handleExportCSV}
        disabled={isExporting}
        className="w-full bg-white p-4 rounded-xl flex-row items-center border border-slate-100 shadow-sm active:bg-slate-50 mb-8"
      >
        <View className="w-10 h-10 bg-emerald-50 rounded-full items-center justify-center mr-3">
          {isExporting ? (
            <ActivityIndicator size="small" color="#059669" />
          ) : (
            <Ionicons name="document-text-outline" size={22} color="#059669" />
          )}
        </View>
        <View className="flex-1">
          <Text className="text-slate-800 font-bold text-base">Ekspor Laporan (CSV)</Text>
          <Text className="text-slate-500 text-xs">Cadangkan catatan ke Excel / Spreadsheet</Text>
        </View>
        <Ionicons name="share-social-outline" size={20} color="#94a3b8" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setLogoutModalVisible(true)}
        className="w-full bg-white p-4 rounded-xl flex-row justify-center items-center border border-rose-200 shadow-sm active:bg-rose-50"
      >
        <Ionicons name="log-out-outline" size={22} color="#e11d48" className="mr-2" />
        <Text className="text-rose-600 font-bold text-base ml-1">Keluar dari Akun</Text>
      </TouchableOpacity>

      <ConfirmModal
        visible={isLogoutModalVisible}
        title="Konfirmasi Keluar"
        message="Apakah kamu yakin ingin keluar dari akun ini?"
        confirmText="Keluar"
        cancelText="Batal"
        isDestructive={true}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={executeLogout}
      />
    </View>
  );
}