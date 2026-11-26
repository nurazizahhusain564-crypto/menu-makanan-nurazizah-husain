
// ===================================
// JAVASCRIPT RUMAH MAKAN LEZAT
// ===================================


// 1. FUNGSI TOMBOL PESAN
function pesan(nama, harga) {

    // Simpan nama dan harga makanan
    localStorage.setItem("namaMenu", nama);
    localStorage.setItem("hargaMenu", harga);

    // Simpan jumlah awal
    localStorage.setItem("jumlahMenu", 1);

    // Pindah ke halaman pembayaran
    window.location.href = "pembayaran.html";

}


// 2. FUNGSI FORMAT RUPIAH
function formatRupiah(angka) {

    return "Rp" + Number(angka).toLocaleString("id-ID");

}


// 3. FUNGSI MENGHITUNG TOTAL
function hitungTotal() {

    const harga = Number(
        document.getElementById("menu").value
    );

    const jumlah = Number(
        document.getElementById("jumlah").value
    );

    if (
        harga <= 0 ||
        !Number.isInteger(jumlah) ||
        jumlah < 1
    ) {
        alert("Silakan pilih menu dan jumlah pesanan!");
        return false;
    }

    const total = harga * jumlah;

    document.getElementById("total").innerText =
        formatRupiah(total);

    return true;

}


// 4. FUNGSI MENGISI MENU OTOMATIS
function isiMenuOtomatis() {

    const namaMenu = localStorage.getItem("namaMenu");
    const hargaMenu = localStorage.getItem("hargaMenu");

    const menu = document.getElementById("menu");

    if (!menu || !namaMenu || !hargaMenu) {
        return;
    }

    // Cari menu berdasarkan harga
    menu.value = hargaMenu;

    const jumlah = document.getElementById("jumlah");

    if (jumlah) {
        jumlah.value = 1;
    }

    // Tampilkan total awal
    hitungTotal();

}


// 5. FUNGSI PEMBAYARAN
function bayarSekarang() {

    const nama = document.getElementById("nama").value.trim();

    const menu = document.getElementById("menu");

    const jumlah = Number(
        document.getElementById("jumlah").value
    );

    const metode = document.getElementById("metode").value;

    // Periksa nama pembeli
    if (nama === "") {
        alert("Masukkan nama pembeli terlebih dahulu!");
        return;
    }

    // Periksa menu dan jumlah
    if (!hitungTotal()) {
        return;
    }

    // Periksa metode pembayaran
    if (metode === "") {
        alert("Silakan pilih metode pembayaran!");
        return;
    }

    const namaMenu = menu.options[menu.selectedIndex].text;

    const harga = Number(menu.value);

    const total = harga * jumlah;

    // Tampilkan struk
    const struk = document.getElementById("struk");

    struk.style.display = "block";

    struk.innerHTML = `
        <h3>🧾 BUKTI PEMBAYARAN</h3>

        <hr>

        <p>Nama Pembeli: ${escapeHTML(nama)}</p>

        <p>Nama Menu: ${escapeHTML(namaMenu)}</p>

        <p>Harga: ${formatRupiah(harga)}</p>

        <p>Jumlah Pesanan: ${jumlah}</p>

        <p>Metode Pembayaran: ${escapeHTML(metode)}</p>

        <hr>

        <h3>Total Pembayaran:</h3>

        <h2>${formatRupiah(total)}</h2>

        <p>Status: Menunggu Pembayaran</p>

        <p>Terima kasih telah memesan!</p>

        <button onclick="window.print()">
            Cetak Struk
        </button>
    `;

}


// 6. FUNGSI MENGAMANKAN TEKS
function escapeHTML(teks) {

    return teks.replace(/[&<>"']/g, function(huruf) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[huruf];

    });

}


// 7. JALANKAN OTOMATIS SAAT HALAMAN DIBUKA
document.addEventListener("DOMContentLoaded", function() {

    isiMenuOtomatis();

});
