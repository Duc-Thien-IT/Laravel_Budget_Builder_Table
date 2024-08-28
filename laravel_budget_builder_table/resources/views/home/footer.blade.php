<footer class="footer">
        <button type="submit"><box-icon name='plus'></box-icon></button>
        <button type="submit"><a href="#"><box-icon name='detail' ></box-icon></a></button>
        <button type="submit"><a href="#">Trang 1</a></button>
</footer>
<script src="{{asset('main.js')}}"></script>
<script>
        let currentPage = 1;
        const containers = document.querySelectorAll('.container-grid');
        const addButton = document.getElementById('addContainerButton');
        const paginationButton = document.getElementById('paginationButton');

        addButton.addEventListener('click', function() {
            const newContainer = document.createElement('div');
            newContainer.classList.add('container-grid');
            newContainer.innerHTML = '<!-- Content for new container -->';
            document.getElementById('gridContainer').appendChild(newContainer);
        });

        paginationButton.addEventListener('click', function() {
            currentPage++;
            if (currentPage > containers.length) currentPage = 1;

            containers.forEach((container, index) => {
                container.classList.toggle('active', index + 1 === currentPage);
            });

            paginationButton.textContent = `Trang ${currentPage}`;
        });
</script>
