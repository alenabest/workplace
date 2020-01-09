sudo -u postgres psql -c "DROP DATABASE workplace;" || echo Database not exist
sudo -u postgres psql -c "CREATE DATABASE workplace;"
sudo -u postgres psql -c "CREATE user workplace with password 'workplace'" || echo User already exist
sudo -u postgres psql -c "GRANT ALL ON DATABASE workplace TO workplace;"
