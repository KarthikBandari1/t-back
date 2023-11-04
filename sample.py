import sqlite3
import pandas as pd

# Connect to the SQLite database
conn = sqlite3.connect('user.db')

# Read the CSV data using pandas
df = pd.read_csv('../../../../../taos3.csv')

# Insert the data into the SQLite database
df.to_sql('Peolpe', conn, if_exists='append', index=False)

# Close the database connection
conn.close()
