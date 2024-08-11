document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('data-form');
    const tableBody = document.getElementById('data-table').querySelector('tbody');
    let dataCount = 0;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const candidate = document.getElementById('candidate').value;
        const startDate = new Date(document.getElementById('start-date').value);
        const endDate = new Date(document.getElementById('end-date').value);
        const progress = parseInt(document.getElementById('progress').value);

        // Hitung estimasi progress
        const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
        const elapsedDays = (new Date() - startDate) / (1000 * 60 * 60 * 24);
        const estimatedProgress = Math.min((elapsedDays / totalDays) * 100, 100);

        // Buat baris tabel
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${name}</td>
            <td>${candidate}</td>
            <td>
                <div class="progress-bar-container">
                    <div class="progress-bar estimation" style="width: ${estimatedProgress}%;"></div>
                    <div class="progress-bar actual" style="width: ${progress}%;"></div>
                </div>
            </td>
            <td>
                <button onclick="editRow(this)">Edit</button>
                <button onclick="deleteRow(this)">Hapus</button>
            </td>
        `;
        tableBody.appendChild(tr);

        // Reset form
        form.reset();

        dataCount++;
        if (dataCount % 4 === 0) {
            createNewPage();
        }
    });

    window.editRow = function(button) {
        const row = button.parentElement.parentElement;
        const cells = row.children;
        document.getElementById('name').value = cells[0].textContent;
        document.getElementById('candidate').value = cells[1].textContent;
        document.getElementById('start-date').value = new Date(cells[2].querySelector('.progress-bar').style.width).toISOString().split('T')[0];
        document.getElementById('end-date').value = new Date(cells[2].querySelector('.progress-bar').style.width).toISOString().split('T')[0];
        document.getElementById('progress').value = parseInt(cells[2].querySelector('.progress-bar.actual').style.width);
        row.remove();
    }

    window.deleteRow = function(button) {
        if (confirm('Anda yakin ingin menghapus baris ini?')) {
            button.parentElement.parentElement.remove();
        }
    }

    function createNewPage() {
        // Implementasi untuk membuat halaman baru
        alert('Membuat halaman baru untuk data');
    }
});
