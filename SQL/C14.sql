create table Jurusan(
    Jurusan_ID character(3)  primary key not null,
    Jurusan_name varchar(20) not null
);

insert into Jurusan(Jurusan_ID, Jurusan_name) values
('010', 'Sastra Rusia' ),
('011', 'Sastra Inggris'),
('012', 'Sastra Arab'),
('013', 'Sastra Jepang');

create table Mata_kuliah(
    Matkul_ID character(2) primary key not null,
    Matkul_nama varchar(30) not null,
    SKS int(2) not null,
   
);

insert into Mata_kuliah(Matkul_ID, Matkul_nama, SKS) values
('11', 'Fonetika Rusia', 2),
('32', 'Pola Pikir Masyarakat Jepang', 2),
('13', 'Interpretting', 3),
('34', 'Agama', 3),
('25', 'Telaah Naskah Arab dan Teks Alquran', 4),
('5', 'Pendidikan Kewarganegaraan', 2);

select * from Mata_kuliah;


create table Dosen(
    NIP character(4) primary key not null,
    Nama_Dosen varchar(30) not null,
    Matkul_ID character(2) not null,
    foreign key(Matkul_ID) references Mata_kuliah (Matkul_ID)
);

insert into Dosen(NIP, Nama_Dosen, Matkul_ID) values
('1031', 'Dra Susi Machdalena Ph.D', '11'),
('1033', 'Ani Rahmat Ph.D', '11'),
('1221', 'Prof Dr Tajudin', '32'),
('1344', 'Budi Rukhyana', '34'),
('1321', 'Yuni Yulianti', '13'),
('1211', 'Djoni Suhendar', '25');

select * from Dosen;

create table Mahasiswa(
    NIM varchar(6) primary key not null,
    Nama_Mahasiswa varchar(30) not null,
    Alamat text not null,
    Jurusan_ID character(3) not null,
    foreign key(Jurusan_ID) references Jurusan (Jurusan_ID)
);

insert into Mahasiswa(NIM, Nama_Mahasiswa, Alamat, Jurusan_ID) values
('140038', 'Andri Priyadi', 'Cipagalo Bandung', '010'),
('230012', 'Yunita Lestari', 'Purwakarta', '013'),
('180022', 'Andresta Alfarizky', 'Baleendah Bandung', '011'),
('140052', 'Salman Hanif Raditya', 'Bandung', '010');

select * from Mahasiswa;

create table kontrak(
    kontrak_ID integer primary key autoincrement,
    NIP character(4) not null,
    Matkul_ID character(2) not null,
    NIM varchar(6)  not null,
    Nilai varchar(2) not null,
    foreign key(NIP) references Dosen (NIP),
    foreign key(Matkul_ID) references Mata_kuliah (Matkul_ID),
    foreign key(NIM) references Mahasiswa (NIM)
);

insert into kontrak(NIP, Matkul_ID, NIM, Nilai) values
('1031', '11', '140052', 'A'),
('1033', '13', '140038', 'B+'),
('1221', '32', '230012', 'C'),
('1344', '34', '180022', 'A'),
('1031', '25', '140038', 'A');

select * from kontrak;