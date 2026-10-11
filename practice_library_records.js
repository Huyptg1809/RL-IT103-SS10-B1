const borrowRecord = [
  { recordId: "PM01", studentId: "SV101", bookTitle: "Kanji Look and Learn", borrowDays: 18, isReturned: false },
  { recordId: "PM02", studentId: "SV102", bookTitle: "HTML", borrowDays: 15, isReturned: false },
  { recordId: "PM03", studentId: "SV101", bookTitle: "Java", borrowDays: 10, isReturned: true }
];

console.log("Danh sách ban đầu:");
console.table(borrowRecord);


let recordID = prompt("Nhập mã phiếu:");
let isDuplicate = true;

while (isDuplicate === true) {
  isDuplicate = false;

  if (recordID === null || recordID.trim() === "") {
    isDuplicate = true;
  } else {
    for (let i = 0; i < borrowRecord.length; i++) {
      if (borrowRecord[i].recordId === recordID) {
        isDuplicate = true;
        break;
      }
    }
  }

  if (isDuplicate === true) {
    alert("Mã phiếu không hợp lệ hoặc đã tồn tại!");
    recordID = prompt("Nhập lại mã phiếu:");
  }
}

let studentID = prompt("Nhập mã sinh viên:");
while (studentID === null || studentID.trim() === "") {
  studentID = prompt("Nhập lại mã sinh viên:");
}

let bookTitle = prompt("Nhập tên sách:");
while (bookTitle === null || bookTitle.trim() === "") {
  bookTitle = prompt("Nhập lại tên sách:");
}

let borrowDays = Number(prompt("Nhập số ngày mượn:"));
while (!Number.isInteger(borrowDays) || borrowDays < 0) {
  borrowDays = Number(prompt("Nhập lại số ngày mượn:"));
}

borrowRecord.push({
  recordId: recordID,
  studentId: studentID,
  bookTitle: bookTitle,
  borrowDays: borrowDays,
  isReturned: false
});

console.log("Danh sách sau khi thêm:");
console.table(borrowRecord);


let overdueRecords = [];
let totalFee = 0;

for (let i = 0; i < borrowRecord.length; i++) {
  let record = borrowRecord[i];

  if (record.borrowDays > 14) {
    let outDate = record.borrowDays - 14;
    let fee = outDate * 5000;

    totalFee += fee;

    overdueRecords.push({
      recordId: record.recordId,
      studentId: record.studentId,
      bookTitle: record.bookTitle,
      borrowDays: record.borrowDays,
      isReturned: record.isReturned,
      outDate: outDate,
      fee: fee
    });
  }
}

console.log("Danh sách phiếu quá hạn:");
console.table(overdueRecords);
console.log("Tổng số phiếu quá hạn:", overdueRecords.length);
console.log("Tổng tiền phạt:", totalFee, "VNĐ");


let updateID = prompt("Nhập mã phiếu cần trả sách:");
let co = -1;

for (let i = 0; i < borrowRecord.length; i++) {
  if (borrowRecord[i].recordId === updateID) {
    co = i;
    break;
  }
}

if (co === -1) {
  console.log("Không tìm thấy phiếu!");
} else {
  borrowRecord[co].isReturned = true;
  console.log("Cập nhật thành công!");
}

console.table(borrowRecord);


let deleteID = prompt("Nhập mã phiếu cần xóa:");
co = -1;

for (let i = 0; i < borrowRecord.length; i++) {
  if (borrowRecord[i].recordId === deleteID) {
    co = i;
    break;
  }
}

if (co === -1) {
  console.log("Không tìm thấy phiếu!");
} else if (borrowRecord[co].isReturned === false) {
  console.log("Phiếu chưa trả sách, không thể xóa!");
} else {
  let fee = 0;

  if (borrowRecord[co].borrowDays > 14) {
    fee = (borrowRecord[co].borrowDays - 14) * 5000;
  }

  if (fee > 0) {
    console.log("Phiếu còn phí phạt:", fee, "VNĐ");
  } else {
    borrowRecord.splice(co, 1);
    console.log("Xóa phiếu thành công!");
  }
}


console.log("Danh sách cuối cùng:");
console.table(borrowRecord);
console.log("Tổng số phiếu còn lại:", borrowRecord.length);