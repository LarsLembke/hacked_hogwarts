"use strict";

let data;
let dataAll;
let famData
let expelledStudents = [{
    fullname: "J. K. Rowling",
    firstname: "Joan",
    middlename: "Kathleen",
    lastname: "Rowling",
    blood: "mud",
    prefect: false,
    squad: false,
    reason: "transphobe"

}];

let hacked = false;

document.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("start");


    fetchData();
    addListeners();

}

async function fetchData() {

    const url = "https://petlatkea.dk/2021/hogwarts/students.json";
    const bloodUrl = "https://petlatkea.dk/2021/hogwarts/families.json";

    const respons = await fetch(url);
    const famRespons = await fetch(bloodUrl)
    data = await respons.json();
    famData = await famRespons.json()


    console.log(data);

    prepareData(data);


}

function addListeners() {
    document.querySelectorAll(".sort").forEach(butt => butt.addEventListener("click", sortData));
    document.querySelectorAll(".filter").forEach(butt => butt.addEventListener("click", filterData));
    document.querySelectorAll("#searchInput").forEach(input => input.addEventListener("input", searchData));
    document.querySelector(".hat").addEventListener("click", hackTheSystem);
}

function prepareData(data) {
    console.log("prepareData");

    dataAll = data;

    data.forEach(function(student) {

        getName(student);

        cleanupHouse(student);

        giveId(student, data);

        giveResp(student);

        giveBlood(student, famData);

    });

    console.log(data);

    displayData(data);

}

function displayData(data) {

    const temp = document.querySelector("#temp").content;
    const dest = document.querySelector("#list");

    dest.textContent = "";

    data.forEach(function(student) {
        const clone = temp.cloneNode(true);

        clone.querySelector("#fullname").textContent = student.fullname;
        clone.querySelector("#house").textContent = student.house;
        clone.querySelector(".student").addEventListener("click", () => displayPopUp(student));
        dest.appendChild(clone);
    });

    document.querySelector("#no_students").textContent = "Students enrolled: " + dataAll.length;
    document.querySelector("#no_expelled").textContent = "Students expelled: " + expelledStudents.length;
    document.querySelector("#students_display").textContent = "Students displayed: " + data.length;
    document.querySelector("#no_g").textContent = "Student in Gryffindor: " + dataAll.filter(stud => stud.house === "Gryffindor").length;
    document.querySelector("#no_h").textContent = "Student in Hufflepuff: " + dataAll.filter(stud => stud.house === "Hufflepuff").length;
    document.querySelector("#no_r").textContent = "Student in Ravenclaw: " + dataAll.filter(stud => stud.house === "Ravenclaw").length;
    document.querySelector("#no_s").textContent = "Student in Slytherin: " + dataAll.filter(stud => stud.house === "Slytherin").length;




}

function displayExpelled(student) {

    const temp = document.querySelector("#temp").content;
    const dest = document.querySelector("#list");

    dest.textContent = "";

    expelledStudents.forEach(function(student) {
        const clone = temp.cloneNode(true);

        clone.querySelector("#fullname").textContent = student.fullname;
        clone.querySelector("#house").textContent = student.house;
        clone.querySelector(".student").addEventListener("click", () => displayPopUp(student));
        dest.appendChild(clone);
    });

    document.querySelector("#no_students").textContent = "Students enrolled: " + dataAll.length;
    document.querySelector("#no_expelled").textContent = "Students expelled: " + expelledStudents.length;
    document.querySelector("#students_display").textContent = "Students displayed: " + expelledStudents.length;
    document.querySelector("#no_g").textContent = "Student in Gryffindor: " + dataAll.filter(stud => stud.house === "Gryffindor").length;
    document.querySelector("#no_h").textContent = "Student in Hufflepuff: " + dataAll.filter(stud => stud.house === "Hufflepuff").length;
    document.querySelector("#no_r").textContent = "Student in Ravenclaw: " + dataAll.filter(stud => stud.house === "Ravenclaw").length;
    document.querySelector("#no_s").textContent = "Student in Slytherin: " + dataAll.filter(stud => stud.house === "Slytherin").length;
}

function displayPopUp(student) {


    //console.log("WHAT");

    if (student.house === "Gryffindor") {
        document.querySelector("#popup").classList.add("red")
    } else if (student.house === "Hufflepuff") {
        document.querySelector("#popup").classList.add("yellow")
    } else if (student.house === "Ravenclaw") {
        document.querySelector("#popup").classList.add("blue")
    } else {
        document.querySelector("#popup").classList.add("green")
    }

    let imgCode;

    if (student.lastname === "Patil") {
        imgCode = `images/${student.lastname.toLowerCase()}_${student.firstname.toLowerCase()}.png`;
    } else {
        imgCode = `images/${student.lastname.toLowerCase()}_${student.firstname[0].toLowerCase()}.png`;
    }


    const temp2 = document.querySelector("#temp_popup").content;
    const dest2 = document.querySelector("#popup");

    dest2.textContent = "";

    const clone2 = temp2.cloneNode(true);

    clone2.querySelector(".fullname_popup").textContent = student.fullname;
    clone2.querySelector(".img_popup").src = imgCode;
    clone2.querySelector(".house_popup").textContent = student.house;
    clone2.querySelector(".blood_popup").textContent = student.blood;
    clone2.querySelector(".prefect_popup").textContent = student.prefect;
    clone2.querySelector(".squad_popup").textContent = student.squad;
    clone2.querySelector(".expel").addEventListener("click", () => expelStudent(student));
    clone2.querySelector(".make_prefect").addEventListener("click", () => togglePrefect(student));
    clone2.querySelector(".make_squad").addEventListener("click", () => toggleSquad(student));
    dest2.appendChild(clone2);


}

function sortData(event) {

    console.log(event);

    let sortParam = event.target.dataset.sort;

    console.log(sortParam);

    if (sortParam === "firstname") {

        console.log(sortParam);

        let sortedData = data.sort(sortingData)

        function sortingData(a, b) {

            if (a[sortParam] < b[sortParam]) {
                return -1;
            }
            return 1;
        }

        console.log(sortedData);

        displayData(sortedData)

    } else if (sortParam === "lastname") {

        console.log(sortParam);

        let sortedData = data.sort(sortingData)

        function sortingData(a, b) {

            if (a[sortParam] < b[sortParam]) {
                return -1;
            }
            return 1;
        }

        console.log(sortedData);

        displayData(sortedData)

    } else {
        let sortedData = data.sort(sortingData)

        console.log(sortParam);


        function sortingData(a, b) {

            if (a[sortParam] < b[sortParam]) {
                return -1;
            }
            return 1;
        }

        console.log(sortedData);

        displayData(sortedData)

    }

}

function filterData(event) {

    let filterParam = event.target.dataset.filter;

    if (filterParam === "expelled") {

        displayExpelled();
    } else {



        function houseFilter(student) {

            console.log("house")

            if (filterParam === "all") {
                return true
            } else if (filterParam === "squad" && student.squad === true) {

                console.log(student.house, filterParam);

                return true;
            } else if (filterParam === "prefect" && student.prefect === true) {

                console.log(student.house, filterParam);

                return true;
            } else if (student.house == filterParam) {

                console.log(student.house, filterParam);

                return true;
            } else {
                console.log(student.house, filterParam);

                console.log("false");
                return false
            }

        }

        displayData(data.filter(houseFilter));

    }

}

function searchData() {

    let searchInput = document.querySelector("#searchInput").value;

    //console.log(searchInput);


    function searchStudents(students) {



        //console.log(students.firstname);

        if (students.firstname.toLowerCase().includes(searchInput.toLowerCase())) {
            console.log(students);
            return true
        } else {
            return false
        }


    }

    console.log(data.filter(searchStudents));

    displayData(data.filter(searchStudents));

}

function giveResp(student) {

    student.prefect = false;

    student.squad = false;

    return student.prefect + student.squad;

}

function giveBlood(student, blood) {

    if (blood.pure.includes(student.lastname)) {
        console.log("pure");

        student.blood = "pure";

        return student.blood;

    } else if (blood.half.includes(student.lastname)) {
        console.log("half");

        student.blood = "half";

        return student.blood;
    } else {
        console.log("mud");

        student.blood = "mud";

        return student.blood;
    }

}

function togglePrefect(student) {



    const prefects = data.filter(studs => studs.prefect);
    const numberOfPrefect = prefects.length;
    const prefectsHouse = prefects.filter(studs => studs.type === student.type);


    if (student.prefect === true) {
        student.prefect = false;
    } else if (prefectsHouse.length === 2) {
        console.log("too many");
        alert(`There can onlye be 2 prefects per house. The current prefect of this house are ${prefectsHouse[0].fullname} and ${prefectsHouse[1].fullname}`)
    } else {
        console.log("true")
        student.prefect = true;
    }


}

function toggleSquad(student) {

    if (student.squad === true) {
        student.squad = false;
    } else if (student.blood === "pure") {
        student.squad = true;
    } else {
        alert("This student can NOT join the Inquisitorial Squad! Yours, Umbridge 😺")
    }

}

function expelStudent(student) {

    console.log("expel", student);

    expelledStudents.push(student);
    data.splice(data.indexOf(student), 1);

    displayData(data);

}

function getName(student) {

    student.fullname = student.fullname.trim();

    let studentSplit = student.fullname.split(" ");

    if (studentSplit.length == 2) {

        if (studentSplit[1].includes("-")) {
            const indexDash = studentSplit[1].indexOf("-");

            let firstName = studentSplit[0].substring(0, 1).toUpperCase() + studentSplit[0].substring(1).toLowerCase(0);
            let lastName = studentSplit[1].substring(0, 1).toUpperCase() + studentSplit[1].substring(indexDash, indexDash + 1).toUpperCase() + studentSplit[1].substring(1).toLowerCase(0);

            const nameDone = {
                firstname: firstName,
                lastname: lastName
            };

            //console.log("cap")

            return nameDone;


        }

        let studentSplitCap = capFirstNoMiddle(studentSplit);

        student.firstname = studentSplitCap.firstname
        student.lastname = studentSplitCap.lastname

        student.fullname = `${student.firstname} ${student.lastname}`;

        return student.firstname + student.lastname + student.fullname;

    } else if (studentSplit.length > 2) {

        if (studentSplit[1].includes("\"")) {

            let firstName = studentSplit[0].substring(0, 1).toUpperCase() + studentSplit[0].substring(1).toLowerCase(0);
            let nickName = studentSplit[1].substring(1, 2).toUpperCase() + studentSplit[1].substring(2).toLowerCase(0);
            let lastName = studentSplit[2].substring(0, 1).toUpperCase() + studentSplit[2].substring(1).toLowerCase(0);


            const nameDone = {
                firstname: firstName,
                nickname: nickName,
                lastname: lastName
            };

            return nameDone;

        }

        let studentSplitCap = capFirstMiddle(studentSplit);

        student.firstname = studentSplitCap.firstname
        student.middlename = studentSplitCap.middlename
        student.lastname = studentSplitCap.lastname

        student.fullname = `${student.firstname} ${student.middlename} ${student.lastname}`;

        return student.firstname + student.middlename + student.lastname + student.fullname;
    } else {
        student.firstname = studentSplit[0]
        student.fullname = studentSplit[0]

        return student.firstname + student.fullname;
    }

}

function cleanupHouse(student) {

    let houseTrimmed = student.house.trim();

    student.house = houseTrimmed.substring(0, 1).toUpperCase() + houseTrimmed.substring(1).toLowerCase(0)

    return student.house

}

function capFirstNoMiddle(nameCap) {

    let firstName = nameCap[0].substring(0, 1).toUpperCase() + nameCap[0].substring(1).toLowerCase(0);
    let lastName = nameCap[1].substring(0, 1).toUpperCase() + nameCap[1].substring(1).toLowerCase(0);

    const nameDone = {
        firstname: firstName,
        lastname: lastName
    };

    //console.log("cap")

    return nameDone;
}

function capFirstMiddle(nameCap) {

    let firstName = nameCap[0].substring(0, 1).toUpperCase() + nameCap[0].substring(1).toLowerCase(0);
    let middleName = nameCap[1].substring(0, 1).toUpperCase() + nameCap[1].substring(1).toLowerCase(0);
    let lastName = nameCap[2].substring(0, 1).toUpperCase() + nameCap[2].substring(1).toLowerCase(0);


    const nameDone = {
        firstname: firstName,
        middlename: middleName,
        lastname: lastName
    };

    return nameDone;

}

function giveId(student, students) {

    student.id = students.indexOf(student) + 1;

}

function hackTheSystem() {

    hacked = true;

    document.querySelector(".student").removeEventListener;

    console.log("!!!THE SYSTEM IS COMPROMISED!!!");

    addSelf();

    function addSelf() {

        let charlie = {
            fullname: "Nanna Charlie Vinther",
            firstname: "Nanna",
            middlename: "Charlie",
            lastname: "Vinther",
            house: "Hufflepuff",
            blood: "half",
            prefect: false,
            squad: false,
            id: 420
        }

        let lars = {
            fullname: "Lars Michael Lembke",
            firstname: "Lars",
            middlename: "Michael",
            lastname: "Lembke",
            house: "Slytherin",
            blood: "half",
            prefect: false,
            squad: false,
            id: 666
        }

        data.push(charlie);
        data.push(lars);

        console.log(data);

        hackedDisplay(data);

    }


    function hackedDisplay(hackedData) {

        const temp = document.querySelector("#temp").content;
        const dest = document.querySelector("#list");

        dest.textContent = "";

        hackedData.forEach(function(student) {
            const clone = temp.cloneNode(true);

            clone.querySelector("#fullname").textContent = student.fullname;
            clone.querySelector("#house").textContent = student.house;
            clone.querySelector(".student").addEventListener("click", () => hackedPopup(student));
            dest.appendChild(clone);
        });

        document.querySelector("#no_students").textContent = "Students enrolled: " + dataAll.length;
        document.querySelector("#no_expelled").textContent = "Students expelled: " + expelledStudents.length;
        document.querySelector("#students_display").textContent = "Students displayed: " + data.length;
        document.querySelector("#no_g").textContent = "Student in Gryffindor: " + dataAll.filter(stud => stud.house === "Gryffindor").length;
        document.querySelector("#no_h").textContent = "Student in Hufflepuff: " + dataAll.filter(stud => stud.house === "Hufflepuff").length;
        document.querySelector("#no_r").textContent = "Student in Ravenclaw: " + dataAll.filter(stud => stud.house === "Ravenclaw").length;
        document.querySelector("#no_s").textContent = "Student in Slytherin: " + dataAll.filter(stud => stud.house === "Slytherin").length;

    }

    function hackedPopup(student) {


        let imgCode;

        if (student.lastname === "Patil") {
            imgCode = `images/${student.lastname.toLowerCase()}_${student.firstname.toLowerCase()}.png`;
        } else {
            imgCode = `images/${student.lastname.toLowerCase()}_${student.firstname[0].toLowerCase()}.png`;
        }

        const temp2 = document.querySelector("#temp_popup").content;
        const dest2 = document.querySelector("#popup");

        dest2.textContent = "";

        const clone2 = temp2.cloneNode(true);

        clone2.querySelector(".fullname_popup").textContent = student.fullname;
        clone2.querySelector(".img_popup").src = imgCode;
        clone2.querySelector(".house_popup").textContent = student.house;
        clone2.querySelector(".blood_popup").textContent = randomizeBlood(student);
        clone2.querySelector(".prefect_popup").textContent = student.prefect;
        clone2.querySelector(".squad_popup").textContent = student.squad;
        clone2.querySelector(".expel").addEventListener("click", () => hackedExpel(student));
        clone2.querySelector(".make_prefect").addEventListener("click", () => togglePrefect(student));
        clone2.querySelector(".make_squad").addEventListener("click", () => hackedSquad(student));
        dest2.appendChild(clone2);

    }

    function hackedExpel(student) {

        if (student.id >= 100) {
            alert("THIS STUDENT CANNTO BE EXPELLED!")
        } else {
            expelledStudents.push(student);
            data.splice(data.indexOf(student), 1);

            hackedDisplay(data);

        }

    }

    function hackedSquad(student) {

        setTimeout(alert("NO SQUAD CHOSEN", 1000));

    }

    function randomizeBlood(student) {

        if (student.blood === "pure") {

            let bloodNumber = Math.round(Math.random() * 1);

            if (bloodNumber === 0) {

                student.bloodNew = "mud";

                return student.bloodNew;

            } else {
                student.bloodNew = "half";
                return student.bloodNew;
            }


        } else {
            student.bloodNew = "pure";
            return student.bloodNew;
        }


    }

}