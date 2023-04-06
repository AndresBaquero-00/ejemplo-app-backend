create tablespace EJEMPLODEF 
datafile 'C:\app\USUARIO\product\21c\oradata\XE\XEPDB1\EJEMPLODEF.DBF' 
size 2M autoextend on;

create temporary tablespace EJEMPLOTMP 
tempfile 'C:\app\USUARIO\product\21c\oradata\XE\XEPDB1\EJEMPLOTMP.DBF' 
size 2M autoextend on;

create user ejemploadmin
identified by ejemploadmin
default tablespace EJEMPLODEF
temporary tablespace EJEMPLOTMP
quota 2M on EJEMPLODEF;

grant connect, resource to ejemploadmin;