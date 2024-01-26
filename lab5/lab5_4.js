var person = {
    firstname: "Albert",
    lastname: "Einstein",
    setLastName: function(_lastname) { // setter
        this.lastname = _lastname;
    },
    setFirstName: function(_firstname) { // setter
        this.firstname = _firstname;
    },
    getFullName: function() { // getter
        return this.firstname + ' ' + this.lastname;
    }
};

person.setLastName('Lý');
person.setFirstName('Kiệt');
console.log(person.getFullName()); // Output: Isaac Newton
