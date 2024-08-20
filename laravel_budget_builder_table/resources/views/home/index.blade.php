<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link href="{{asset('style.css')}}" rel="stylesheet" >
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    <title>Sheet</title>
</head>
<body>
    <header class="header">
        <div>
            <input type="text" name="startMonth" placeholder="Enter number months..." style="height: 35px; margin-top: 2px;"> 
            <button class="btn btn-success" type="submit" >Enter</button>
        </div>
        <h1>Budget Builder Table</h1>
    </header>

    <div class="container" id="gridContainer">
        
    </div>
    
    <footer class="footer">
        <button type="submit"><a href="#"><box-icon name='plus'></box-icon></a></button>
        <button type="submit"><a href="#"><box-icon name='detail' ></box-icon></a></button>
        <button type="submit"><a href="#">Trang 1</a></button>
    </footer>
    <script src="{{asset('main.js')}}"></script>
</body>
</html>