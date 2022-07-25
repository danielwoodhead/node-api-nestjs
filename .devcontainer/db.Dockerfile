FROM mcr.microsoft.com/mssql/server
WORKDIR /usr/src/app
COPY setup-database.sh setup.sql ./
RUN chmod +x /usr/src/app/setup-database.sh
CMD /usr/src/app/setup-database.sh & /opt/mssql/bin/sqlservr
