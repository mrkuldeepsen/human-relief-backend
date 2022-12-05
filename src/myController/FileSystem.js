import fs from 'fs';
 
export const delete_single_file = (file) => {
    let file_path = 'src/uploads/'+file;

    try {
        if (fs.existsSync(file_path)) {
            fs.unlinkSync(file_path);
            return 1;
        }else{
            return 0;
        }
      } catch(err) {
        console.error(err)
      }
} 
 
export const delete_multi_file = (file) =>{
    let i = 0;
    file.map((file)=>{
        let file_item = 'src/uploads/'+file;
        try {
            if (fs.existsSync(file_item)) {
                fs.unlinkSync(file_item);
                i = i+1;
            }
        } catch(err) {
            console.error(err)
            return i;
        }
    })
    return i;
} 

/*
var file_paths  = 'photo-1647067894063.webp';  
console.log(delete_single_file(file_paths));

var file_array = ['photo-1647067536396.webp', 'photo-1647067894066.webp', 'photo-1647067894053.jpg',"photo-1647067894065.webp"];
console.log(delete_multi_file(file_array));
*/