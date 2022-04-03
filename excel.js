let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "":""
}]


document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx'); // something went wrong 11
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
        data = event.target.result;
        console.log(data);
        // var cfb = XLS.CFB.read(data, {type: 'binary'});
        // var workbook = XLS.parse_xlscfb(cfb);
        let workbook = XLSX.read(data,{type:"binary"});
        console.log(workbook);
        // var Sheet = workbook.SheetNames[0];
        // var excelRows = XLS.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
        // console.log(excelRows);
        workbook.SheetNames.forEach(element => {
            let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[element]);
            document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)

            console.log(rowObject);
        });
        data = null;
        //  workbook.SheetNames.forEach(sheet => {
        //       let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
        //       console.log(rowObject);
        //  });
        }
    }
});