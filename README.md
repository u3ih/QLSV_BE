# exercise-mongo

Kết nối với Mongodb quản lý các bảng `students`, `courses`, `classes`

## Base Model, Base Controller

em đã tạo file Base model và Base Controller để tái sử dụng lại code và dễ quản lý hơn

## Relation

Thiết lập quan hệ 1-n giữa 2 bảng `students` và `courses`
```sh
  1 course chứa được nhiều student với `hasMany` và `BelongTo`
```
## Validate dữ liệu

Validate dữ liệu, em sử dụng jsonSchema trong file Model
- `student.model`
    + `codeStudent`: Mã sinh viên theo định dạng SV[0-9][0-9]?,
    + `age`: Độ tuổi trong khoảng từ 0-200


