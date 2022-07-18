FROM mcr.microsoft.com/mssql/server
WORKDIR /usr/src/app
COPY setup-database.sh setup.sql ./
CMD /usr/src/app/setup-database.sh & /opt/mssql/bin/sqlservr
