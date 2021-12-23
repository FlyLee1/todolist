const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');

inputBox.onkeyup = () => {
    let userData = inputBox.value; // nhận giá trị của ng dùng
    if (userData.trim() != 0) { //khi giá trị người dùng nhập vào kh dc để trắng
        addBtn.classList.add("active"); // kích hoạt nút button
    } else {
        addBtn.classList.remove("active");
    }
}

showTasks(); //gọi hàm showTasks

// Khi người dùng nhập vào nút thêm
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); // tạo 1 bộ nhớ cục bộ
    if (getLocalStorage == null) { // nếu getLocalStorage bằng null
        listArr = []; // tạo mảng trống
    } else {
        listArr = JSON.parse(getLocalStorage); // chuyển đổi chuỗi json thành một đối tượng js
    }
    listArr.push(userData); // thêm dữ liệu người dùng
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // chuyển đổi đối tượng js thành một chuỗi json
    showTasks();
}

// chức năng thêm danh sách task bên trong ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) { // nếu getLocalStorage bằng null
        listArr = []; // tạo mảng trống
    } else {
        listArr = JSON.parse(getLocalStorage); //chuyển đổi chuỗi json thành một đối tượng js
    }
    // khúc này ta sẽ làm phần số lượng task
    // khi mà tạo đc nhiêu thì nó sẽ hiện ra bấy nhiêu task - hiện sluong ở phần span của footer
    // tạo 1 biến pendingNumb    
    const pendingNumb = document.querySelector('.pendingNumb');
    pendingNumb.textContent = listArr.length;
    // nếu độ dài mảng>0 thì ta sẽ cho nút clear all hiện lên 
    if (listArr.length > 0) {
        deleteAllBtn.classList.add("active"); //kích hoạt nút clear all
    } else {
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
        // += là những task khác hiện lên danh sách cùng
    });
    todoList.innerHTML = newLiTag; // thêm thẻ li mới trog thẻ ul
    inputBox.value = ""; // sau khi task đc thêm thì để trống chữ vừa viết trên thanh input
}

// xóa task
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); // xóa hoặc loại bỏ li được lập cụ thể từng cái 1
    // sau khi remove thẻ li lần nữa thì tiếp tục cập nhật lại bộ nhớ cục bộ
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // chuyển đổi đối tượng js thành một chuỗi json
    showTasks(); //gọi hàm showTasks
}

// xóa tất cả task clear all
deleteAllBtn.onclick = () => {
    listArr = []; //làm trống 1 mảng
    // sau khi xóa tất cả tác vụ,cập nhật lại bộ nhớ cục bộ
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}