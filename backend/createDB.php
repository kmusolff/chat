<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('main.db');
      }
   }
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }

   $sql =<<<EOF
      CREATE TABLE chat
      (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      username CHAR(64) NOT NULL,
      message TEXT NOT NULL,
      time INTEGER NOT NULL);
EOF;

   $ret = $db->exec($sql);
   if(!$ret){
      echo $db->lastErrorMsg();
   } else {
      echo "Table created successfully\n";
   }
   $db->close();
?>