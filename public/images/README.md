# Folder Gambar Produk

Folder ini untuk menyimpan gambar-gambar produk monitoring jantung.

## 📸 Gambar yang Diperlukan:

1. **ring.jpg** - Gambar Smart Ring (cincin pintar)
2. **band.jpg** - Gambar Smart Band (gelang kesehatan)  
3. **armband.jpg** - Gambar Armband Sensor

## 🚀 Cara Upload Gambar:

### Via GitHub Web:
1. Buka halaman ini di GitHub
2. Klik tombol **"Add file"** → **"Upload files"**
3. Drag & drop atau pilih 3 file gambar:
   - Rename menjadi: `ring.jpg`, `band.jpg`, `armband.jpg`
4. Klik **"Commit changes"**

### Via Git CLI:
```bash
cd DeteksiJantung/public/images
cp /path/to/your/ring-image.jpg ring.jpg
cp /path/to/your/band-image.jpg band.jpg  
cp /path/to/your/armband-image.jpg armband.jpg
git add .
git commit -m "Tambahkan gambar produk"
git push
```

## ✅ Format Gambar:
- **Format**: JPG/JPEG (disarankan)
- **Ukuran**: Lebar minimal 600px, tinggi minimal 400px
- **Orientasi**: Landscape atau persegi
- **Size file**: < 500KB (untuk loading cepat)

## 📝 Catatan:
- Pastikan nama file **persis** seperti di atas (huruf kecil semua)
- Gambar akan ditampilkan dengan height 256px di halaman produk
- Jika gambar tidak ditemukan, akan muncul placeholder otomatis