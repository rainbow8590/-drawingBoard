<?php 
	$data = $_POST['data'];
	$res = strstr($data,',');
	$res1 = substr($res,1);
	// base 64 解码
	$res2 = base64_decode($res1);
	$fileName = uniqid();
	file_put_contents('saveImages/'.$fileName.'.jpg', $res2);
	echo 'saveImages/'.$fileName.'.jpg';
	
