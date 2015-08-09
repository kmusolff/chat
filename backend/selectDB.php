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
      echo "Opened database successfully<br>";
   }

   $sql =<<<EOF
      SELECT * from chat;
EOF;

   $ret = $db->query($sql);
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
      echo "ID = ". $row['id'] . "<br>";
      echo "NAME = ". $row['username'] ."<br>";
      echo "ADDRESS = ". $row['message'] ."<br>";
      echo "SALARY =  ".$row['time'] ."<br><br>";
   }
   echo "Operation done successfully<br>";
   $db->close();
?>