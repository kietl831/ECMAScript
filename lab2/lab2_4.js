function spreadOut() {
    let fragment = ['to', 'code'];
    //let sentence; // Thay đổi đoạn code này
    let sentence = ['learning', ...fragment, 'is', 'fun'];
    return sentence;
}

console.log(spreadOut()); // kết quả trả về là một mảng ['learning', 'to', 'code', 'is', 'fun'].