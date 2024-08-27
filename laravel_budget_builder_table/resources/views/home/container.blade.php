<form id="budgetForm" action="{{url('save_Table')}}" method="POST" enctype="multipart/form-data" style="margin-bottom: 10vh;">
@csrf
    <div class="container" id="gridContainer">
        
    </div>
    <div style="margin-bottom: 100px; display: flex; justify-content: center;">
        <button class="btn btn-primary" type="button" onclick="submitForm()">Lưu thông tin</button>
    </div>  
</form>