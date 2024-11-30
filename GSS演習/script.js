document.addEventListener('DOMContentLoaded', function() {
    fetch('https://script.google.com/macros/s/AKfycbzkojtHQu6O5R9H0dyIW3DBotuZt0xYdKqwH0zPB46HpIb5cdwfkbHx0WdHotplj6bweA/exec')
        .then(response => response.json())
        .then(data => {
            const header = document.getElementById('table-header');
            const body = document.getElementById('table-body');

            // ヘッダーの作成
            data.headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                header.appendChild(th);
            });

            // データ行の作成
            data.rows.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                body.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
