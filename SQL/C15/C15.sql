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
    SKS int(2) not null
   
);

insert into Mata_kuliah(Matkul_ID, Matkul_nama, SKS) values
('11', 'Fonetika Rusia', 2),
('22', 'Pola Pikir Masyarakat Jepang', 2),
('33', 'Interpretting', 3),
('44', 'Warehouse and Data mining', 3),
('55', 'Telaah Naskah Arab dan Teks Alquran', 4),
('66', 'Pendidikan Kewarganegaraan', 2);

select * from Mata_kuliah;


create table Dosen(
    NIP character(4) primary key not null,
    Nama_Dosen varchar(30) not null

);

insert into Dosen(NIP, Nama_Dosen) values
('1031', 'Dra Susi Machdalena Ph.D'),
('1033', 'Ani Rahmat Ph.D'),
('1221', 'Prof Dr Tajudin'),
('1334', 'Budi Rukhyana'),
('1335', 'Yuni Yulianti'),
('1336', 'Djoni Suhendar');

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
('140039', 'Yunita Lestari', 'Purwakarta', '013'),
('140040', 'Andresta Alfarizky', 'Baleendah Bandung', '011'),
('140041', 'Salman Hanif Raditya', 'Bandung', '010');

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
('1031', '11', '140039', 'A'),
('1033', '33', '140038', 'B'),
('1221', '22', '140040', 'C'),
('1344', '44', '140041', 'A'),
('1031', '55', '140038', 'A');

select * from kontrak;

insert into Mahasiswa(NIM, Nama_Mahasiswa, Alamat, Jurusan_ID) values
('140042', 'Crisda Wibawa', 'Dayeuhkolot Bandung', '012'),
('140043', 'Dwiky Gumelar', 'Tasikmalaya', '010'),
('140044', 'Sarah ', 'Baleendah Bandung', '013'),
('140045', 'Raihan', 'Garut', '010'),
('140046', 'Ira', 'Sukabumi', '010'),
('140047', 'Ema', 'Garut', '011'),
('140048', 'Della', 'Tasikmalaya', '011'),
('140049', 'Rizki Hamzah', 'Bandung', '012');

alter table Mahasiswa ADD umur Date;

update Mahasiswa set umur = '2000-01-29' where NIM = '140038';
update Mahasiswa set umur = '2002-02-28' where NIM = '140039';
update Mahasiswa set umur = '2001-03-15' where NIM = '140040';
update Mahasiswa set umur = '2003-04-02' where NIM = '140041';
update Mahasiswa set umur = '2004-04-29' where NIM = '140042';
update Mahasiswa set umur = '2005-05-05' where NIM = '140043';
update Mahasiswa set umur = '2002-06-19' where NIM = '140044';
update Mahasiswa set umur = '2004-06-06' where NIM = '140045';
update Mahasiswa set umur = '2001-07-15' where NIM = '140046';
update Mahasiswa set umur = '2003-08-13' where NIM = '140047';
update Mahasiswa set umur = '2004-10-23' where NIM = '140048';
update Mahasiswa set umur = '2005-11-02' where NIM = '140049';

insert into kontrak(NIP, Matkul_ID, NIM, Nilai) values
('1031', '11', '140039', 'A'),
('1031', '55', '140040', 'A'),
('1033', '33', '140041', 'D'),
('1221', '22', '140042', 'C'),
('1344', '44', '140038', 'C'),
('1221', '22', '140048', 'B'),
('1334', '44', '140049', 'E'),
('1033', '33', '140044', 'F'),
('1033', '33', '140047', 'A'),
('1221', '22', '140046', 'E'),
('1031', '55', '140042', 'D'),
('1221', '22', '140043', 'B'),
('1344', '44', '140045', 'B'),
('1344', '44', '140039', 'A'),
('1221', '22', '140039', 'C'),
('1033', '33', '140038', 'B'),
('1033', '33', '140039', 'D'),
('1033', '33', '140040', 'E');

--1.tampilkan seluruh data mahasiswa beserta nama jurusannya.
select Nama_Mahasiswa,Jurusan_name from Jurusan join Mahasiswa using(Jurusan_ID);

--2.tampilkan mahasiswa yang memiliki umur dibawah 20 tahun.
select *,Date('now') - Date(umur) as age from Mahasiswa where age<20;

--3.tampilkan mahasiswa yang  memiliki  nilai 'B' ke atas.
select distinct NIM, (select Nama_Mahasiswa from Mahasiswa where Mahasiswa.NIM = kontrak.NIM) as nama 
from kontrak where kontrak.Nilai <= 'B' ;

--4.tampilkan mahasiswa yang memiliki jumlah sks lebih dari 10
select Mahasiswa.NIM, Mahasiswa.Nama_Mahasiswa, SUM(Mata_kuliah.sks) as total_sks from Mahasiswa
join kontrak on kontrak.NIM = Mahasiswa.NIM
join Mata_kuliah on kontrak.Matkul_ID = Mata_kuliah.Matkul_ID
group by Mahasiswa.NIM, Mahasiswa.Nama_Mahasiswa
having total_sks > 10; 

--5.tampilkan mahasiswa yang mengontrak mata kuliah 'data mining'
SELECT kontrak.NIM, mahasiswa.Nama_Mahasiswa, Mata_kuliah.Matkul_nama as MataKuliah 
FROM kontrak INNER JOIN Mahasiswa ON kontrak.NIM = Mahasiswa.NIM
INNER JOIN Mata_kuliah ON kontrak.Matkul_ID = Mata_kuliah.Matkul_ID
WHERE Mata_kuliah.Matkul_nama like '%DATA MINING%';

--6.tampilkan jumlah mahasiswa untuk setiap dosen
select Nama_Dosen,(select count(distinct NIM) from kontrak where kontrak.NIP = Dosen.NIP) as Jumlah_mahasiswa from Dosen;

--7.urutkan mahasiswa berdasarkan umurnya
select Nama_Mahasiswa, Date('now') - Date(umur) as Umur_saat_ini from Mahasiswa order by Umur_saat_ini asc;

--8.tampilkan kontrak matakuliah yang harus diulang,serta tampilkan data mahasiswa jurusan dan dosen secara lengkap

select distinct kontrak.kontrak_ID, kontrak.Matkul_ID, kontrak.Nilai, Mahasiswa.NIM, Mahasiswa.Nama_Mahasiswa, Mahasiswa.Alamat, 
Mahasiswa.umur, Jurusan.Jurusan_ID, Jurusan.Jurusan_name,kontrak.NIP, Dosen.Nama_Dosen from kontrak join Mahasiswa on kontrak.NIM = Mahasiswa.NIM
join Jurusan on mahasiswa.Jurusan_ID = Jurusan.Jurusan_ID
join Dosen on kontrak.NIP = Dosen.NIP where kontrak.Nilai >= 'D';

--select distinct * from kontrak join Mahasiswa on kontrak.NIM = Mahasiswa.NIM
