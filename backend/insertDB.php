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
      INSERT INTO chat (username,message,time)
      VALUES ('stefan', 'testtesttesttesttesttest',datetime('now'));
EOF;

   $ret = $db->exec($sql);
   if(!$ret){
      echo $db->lastErrorMsg();
   } else {
      echo "Records created successfully\n";
   }
   $db->close();
?>