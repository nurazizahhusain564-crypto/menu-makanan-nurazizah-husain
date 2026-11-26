
document.addEventListener("DOMContentLoaded", function () {

    const nama = document.getElementById("nama");
    const menu = document.getElementById("menu");
    const jumlah = document.getElementById("jumlah");
    const metode = document.getElementById("metode");

    const total = document.getElementById("total");
    const struk = document.getElementById("struk");

    const btnHitung = document.getElementById("btnHitung");
    const btnBayar = document.getElementById("btnBayar");

    let totalHarga = 0;

    // Mengambil pesanan dari halaman menu
    const namaTersimpan = localStorage.getItem("namaMenu");
    const hargaTersimpan = localStorage.getItem("hargaMenu");

    if (namaTersimpan && hargaTersimpan) {

        for (let i = 0; i < menu.options.length; i++) {

            if (
                menu.options[i].text.trim().toLowerCase() ===
                namaTersimpan.trim().toLowerCase()
            ) {
                menu.selectedIndex = i;
                break;
            }

        }

        jumlah.value = 1;

    }

    // Fungsi format rupiah
    function rupiah(angka) {
        return "Rp" + angka.toLocaleString("id-ID");
    }

    // Fungsi hitung total
    function hitungTotal() {

        const harga = Number(menu.value);
        const banyak = Number(jumlah.value);

        if (harga <= 0) {
            alert("Silakan pilih menu makanan!");
            return false;
        }

        if (
            !Number.isInteger(banyak) ||
            banyak < 1
        ) {
            alert("Jumlah pesanan harus minimal 1!");
            return false;
        }

        totalHarga = harga * banyak;

        total.textContent = rupiah(totalHarga);

        return true;
    }

    // Tombol hitung total
    btnHitung.addEventListener("click", function () {

        hitungTotal();

    });

    // Tombol bayar sekarang
    btnBayar.addEventListener("click", function () {

        if (nama.value.trim() === "") {
            alert("Masukkan nama pembeli!");
            nama.focus();
            return;
        }

        if (!hitungTotal()) {
            return;
        }

        if (metode.value === "") {
            alert("Silakan pilih metode pembayaran!");
            metode.focus();
            return;
        }

        const namaMenu =
            menu.options[menu.selectedIndex].text;

        const banyak = Number(jumlah.value);

        struk.style.display = "block";

        struk.innerHTML = `
            <h3>🧾 BUKTI PEMBAYARAN</h3>

            <hr>

            <p>Nama Pembeli: ${aman(nama.value.trim())}</p>

            <p>Menu: ${aman(namaMenu)}</p>

            <p>Jumlah: ${banyak}</p>

            <p>Metode: ${aman(metode.value)}</p>

            <hr>

            <h3>Total Pembayaran</h3>

            <h2>${rupiah(totalHarga)}</h2>

            <p>Status: Menunggu Pembayaran</p>

            <p>Terima kasih telah memesan!</p>

            <button type="button" id="btnCetak">
                Cetak Struk
            </button>
        `;

        document.getElementById("btnCetak")
            .addEventListener("click", function () {
                window.print();
            });

        struk.scrollIntoView({
            behavior: "smooth"
        });

    });

    // Mengamankan teks
    function aman(teks) {

        return teks.replace(/[&<>"']/g, function (huruf) {

            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[huruf];

        });

    }

});
