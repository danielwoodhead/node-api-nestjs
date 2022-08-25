FROM mcr.microsoft.com/mssql/server
WORKDIR /usr/src/app
COPY setup-database.sh setup.sql ./
RUN chmod +x setup-database.sh
CMD setup-database.sh & /opt/mssql/bin/sqlservr
