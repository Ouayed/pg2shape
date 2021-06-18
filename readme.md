
[<img width="300" alt="Mapbox logo" src="https://2019.postgresopen.org/static/47957f3/images/logo.png">](https://www.mapbox.com/)

# **pg2shp**
>Spatial PostgreSQL table to ESRI shape File

# About

> pg2shp is a single exe packaging of [pgsql2shp](https://postgis.net/) [RELEASE: 3.0.3](https://download.osgeo.org/postgis/windows/pg96/) to dump a postgis database table, view or sql query to ESRI shape file format

# Usage

```
pg2shp -d database [-w password] [-h host] [-p port] [-s <query|table>] [-q where clause] [-f outputfile]
```


OPTIONS:

```
     --help print this help   
     -p port   
     -w password   
     -h host   
     -u dbuser   
     -d database   
     -s query or tablename   
     -q where clause   
     -o order by   
     -l limit    
     -f output shapefile fullpath    

Example: pg2shp -d WDB -w **** -h localhost -p 5432 -s tablename|"select * from tbl where ... order by ... limit ..."] -f   \output\export_xxxx.shp
```

# To create a single executable use [pkg](https://github.com/vercel/pkg)

```
     npm i pkg -g
     pkg  -t "linux,win"  .\package.json  -o .\output\pg2shp-x64
```