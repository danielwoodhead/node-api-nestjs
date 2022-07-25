If the SQL Server VS Code extension fails to install with this error:

```
Installing SQL tools service to /home/node/.vscode-server/extensions/ms-mssql.mssql-1.15.0/sqltoolsservice/4.0.1.1/Debian.
Downloading https://github.com/Microsoft/sqltoolsservice/releases/download/4.0.1.1/microsoft.sqltools.servicelayer-rhel-x64-net6.0.tar.gz
[ERROR] Error: Request error: NONE
```

Run this:

```
cd /home/node/.vscode-server/extensions/ms-mssql.mssql-1.15.0/sqltoolsservice/4.0.1.1/Debian
wget -c https://github.com/Microsoft/sqltoolsservice/releases/download/4.0.1.1/microsoft.sqltools.servicelayer-rhel-x64-net6.0.tar.gz -O - | tar -xz
```

And then reload with Ctrl + Shift + P -> Reload Window