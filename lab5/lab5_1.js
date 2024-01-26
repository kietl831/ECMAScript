// Trong JavaScript, từ khóa this tham chiếu đến một đối tượng "chủ thể" (owner object) mà nó được sử dụng bên trong.
//  Giá trị của this có thể thay đổi tùy thuộc vào cách mà một hàm được gọi.
// vd
class User{
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }
}
let Student = new User('Lý Văn Kiệt', 'kietlvpc07051');