document.addEventListener('DOMContentLoaded', function () {
    // Fallback data jika data.js belum termuat dengan benar
    const fallbackPengguna = [
        { email: "rina@gmail.com", password: "rina123", nama: "Rina Wulandari", role: "User" },
        { email: "agus@gmail.com", password: "agus123", nama: "Agus Pranoto", role: "User" },
        { email: "siti@gmail.com", password: "siti123", nama: "Siti Marlina", role: "Admin" }
    ];

    const fallbackKatalog = [
        { kodeBarang: "ASIP4301", namaBarang: "Pengantar Ilmu Komunikasi", jenisBarang: "Buku Ajar", edisi: "2", stok: 548, harga: "Rp 180.000", cover: "img/pengantar_komunikasi.jpg" },
        { kodeBarang: "EKMA4002", namaBarang: "Manajemen Keuangan", jenisBarang: "Buku Ajar", edisi: "3", stok: 392, harga: "Rp 220.000", cover: "img/manajemen_keuangan.jpg" }
    ];

    const fallbackTracking = {
        "20230012": {
            nomorDO: "20230012",
            nama: "Rina Wulandari",
            status: "Dalam Perjalanan",
            ekspedisi: "JNE",
            tanggalKirim: "2025-08-25",
            paket: "0JKT01",
            total: "Rp 180.000",
            perjalanan: [
                { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGERANG SELATAN" }
            ]
        }
    };

    // Gunakan data global jika ada, jika tidak gunakan fallback
    const listPengguna = (typeof dataPengguna !== 'undefined') ? dataPengguna : fallbackPengguna;
    const listKatalog = (typeof dataKatalogBuku !== 'undefined') ? dataKatalogBuku : fallbackKatalog;
    const listTracking = (typeof dataTracking !== 'undefined') ? dataTracking : fallbackTracking;

    // 1. Logika Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = document.getElementById('email').value.trim();
            const passwordInput = document.getElementById('password').value.trim();

            let found = listPengguna.find(user => user.email === emailInput && user.password === passwordInput);

            if (found) {
                alert(`Login Berhasil! Selamat datang, ${found.nama} (${found.role})`);
                window.location.href = "dashboard.html";
            } else {
                alert("email/password yang anda masukkan salah");
            }
        });
    }

    // 2. Greeting di Dashboard
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        const jam = new Date().getHours();
        let waktu = "Pagi";
        if (jam >= 11 && jam < 15) waktu = "Siang";
        else if (jam >= 15 && jam < 18) waktu = "Sore";
        else if (jam >= 18) waktu = "Malam";
        greetingEl.innerText = `Selamat ${waktu}, Pengguna!`;
    }

    // 3. Render Katalog di stok.html
    const tabelStokBody = document.querySelector('#tabelStok tbody');
    if (tabelStokBody) {
        function renderStok() {
            tabelStokBody.innerHTML = "";
            listKatalog.forEach(item => {
                let row = `<tr>
                    <td><img src="${item.cover}" width="50" alt="Cover" onerror="this.src='img/pengantar_komunikasi.jpg'"></td>
                    <td>${item.kodeBarang}</td>
                    <td>${item.namaBarang}</td>
                    <td>${item.jenisBarang}</td>
                    <td>${item.edisi}</td>
                    <td>${item.stok}</td>
                    <td>${item.harga}</td>
                </tr>`;
                tabelStokBody.innerHTML += row;
            });
        }
        renderStok();
    }

    // Fungsi Tambah Stok via DOM
    window.tambahBarisStok = function() {
        let kodeBarang = document.getElementById('kodeBaru').value;
        let namaBarang = document.getElementById('namaBaru').value;
        let jenisBarang = document.getElementById('jenisBaru').value;
        let edisi = document.getElementById('edisiBaru').value;
        let stok = document.getElementById('stokBaru').value;
        let harga = document.getElementById('hargaBaru').value;

        if (!kodeBarang || !namaBarang || !jenisBarang || !edisi || !stok || !harga) {
            alert("Semua field input barang harus diisi!");
            return;
        }

        listKatalog.push({
            kodeBarang, namaBarang, jenisBarang, edisi,
            stok: Number(stok), harga, cover: "img/pengantar_komunikasi.jpg"
        });
        
        // Refresh tabel jika ada
        const tbody = document.querySelector('#tabelStok tbody');
        if (tbody) {
            tbody.innerHTML = "";
            listKatalog.forEach(item => {
                tbody.innerHTML += `<tr>
                    <td><img src="${item.cover}" width="50" alt="Cover"></td>
                    <td>${item.kodeBarang}</td>
                    <td>${item.namaBarang}</td>
                    <td>${item.jenisBarang}</td>
                    <td>${item.edisi}</td>
                    <td>${item.stok}</td>
                    <td>${item.harga}</td>
                </tr>`;
            });
        }

        document.getElementById('kodeBaru').value = "";
        document.getElementById('namaBaru').value = "";
        document.getElementById('jenisBaru').value = "";
        document.getElementById('edisiBaru').value = "";
        document.getElementById('stokBaru').value = "";
        document.getElementById('hargaBaru').value = "";
        alert("Data stok berhasil ditambahkan via DOM!");
    };

    // Populate Select Buku di Checkout
    const pilihBukuSelect = document.getElementById('pilihBuku');
    if (pilihBukuSelect) {
        listKatalog.forEach(item => {
            let opt = document.createElement('option');
            opt.value = item.harga;
            opt.textContent = `${item.namaBarang} - ${item.harga}`;
            pilihBukuSelect.appendChild(opt);
        });
    }

    // 4. Proses Checkout
    const formCheckout = document.getElementById('formCheckout');
    if (formCheckout) {
        formCheckout.addEventListener('submit', function (e) {
            e.preventDefault();
            let nama = document.getElementById('namaPemesan').value;
            let hargaStr = document.getElementById('pilihBuku').value;
            let jumlah = Number(document.getElementById('jumlahPesan').value);
            
            let cleanHarga = Number(hargaStr.replace(/[^0-9]/g, ''));
            let total = cleanHarga * jumlah;

            document.getElementById('hasilCheckout').innerHTML = `
                Terima kasih, ${nama}. Pesanan berhasil diproses.<br>
                Total Pembayaran: Rp ${total.toLocaleString('id-ID')}<br>
                Nomor DO Simulasi: 20230012
            `;
        });
    }

    // 5. Fitur Tracking
    window.cariTracking = function() {
        let noDO = document.getElementById('inputNoDO').value.trim();
        let hasilDiv = document.getElementById('hasilTracking');

        if (listTracking[noDO]) {
            let data = listTracking[noDO];
            let perjalananHTML = "<ul style='margin-left: 20px; margin-top: 10px;'>";
            if (data.perjalanan) {
                data.perjalanan.forEach(p => {
                    perjalananHTML += `<li><strong>[${p.waktu}]</strong> ${p.keterangan}</li>`;
                });
            }
            perjalananHTML += "</ul>";

            hasilDiv.innerHTML = `
                <div style="background: #e8f8f5; padding: 15px; border-radius: 5px; border: 1px solid #a3e4d7;">
                    <p><strong>Nomor DO:</strong> ${data.nomorDO}</p>
                    <p><strong>Nama Penerima:</strong> ${data.nama}</p>
                    <p><strong>Status:</strong> <span style="color: #27ae60; font-weight: bold;">${data.status}</span></p>
                    <p><strong>Ekspedisi:</strong> ${data.ekspedisi} (${data.paket})</p>
                    <p><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</p>
                    <p><strong>Total:</strong> ${data.total}</p>
                    <p style="margin-top: 10px;"><strong>Riwayat Perjalanan:</strong></p>
                    ${perjalananHTML}
                </div>
            `;
        } else {
            hasilDiv.innerHTML = `<p style="color: #e74c3c;">Nomor Delivery Order tidak ditemukan. Coba gunakan: <b>20230012</b></p>`;
        }
    };
});

// Global functions for Modal (agar bisa diakses onclick di HTML)
function showModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'flex';
}
function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'none';
}