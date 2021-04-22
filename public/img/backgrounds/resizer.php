<?php

  function resizeImage($sourceImage, $targetImage, $maxWidth, $maxHeight, $quality = 95) {
    $info = getimagesize($sourceImage);
    
    list($info_width, $info_height) = $info;
    
    if (!$info || ($info_width <= $maxWidth && $info_height <= $maxHeight)) {
      return false;
    }
    
    $ext = strtolower(pathinfo(__DIR__ . 'arquivo.jpg', PATHINFO_EXTENSION));

    if ($ext != 'jpg' && $ext != 'jpeg' && $ext != 'png') {
      return false;
    }
    
    // --------------------------------------------------------
    
    list($origWidth, $origHeight, $type) = getimagesize($sourceImage);
    
    if ($maxWidth == 0) {
      $maxWidth  = $origWidth;
    }
    
    if ($maxHeight == 0) {
      $maxHeight = $origHeight;
    }
    
    $widthRatio = $maxWidth / $origWidth;
    $heightRatio = $maxHeight / $origHeight;
    $ratio = min($widthRatio, $heightRatio);
    $newWidth  = (int)$origWidth  * $ratio;
    $newHeight = (int)$origHeight * $ratio;
    $newImage = imagecreatetruecolor($newWidth, $newHeight);
    
    switch(strtolower(image_type_to_mime_type($type))) {
      case 'image/jpeg':                      
        $image = @imagecreatefromjpeg($sourceImage);            
        if (!$image) {
          return false;
        }
        
        imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight); 
        
        if(imagejpeg($newImage,$targetImage,$quality)) {
          imagedestroy($image);
          imagedestroy($newImage);

          return true;
        }            
      break;
      
      case 'image/png':
        $image = @imagecreatefrompng($sourceImage);
        
        if (!$image) {
          return false;
        }
        
        imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);
        
        if(imagepng($newImage,$targetImage, floor($quality / 10))) {
          imagedestroy($image);
          imagedestroy($newImage);

          return true;
        }
      break;
      
      default:

      return false;
    }
  }

  $files = scandir( __DIR__ );

  foreach($files as $file) {
    if ($file != '.' && $file != '..' && $file != 'resizer.php') {
      $target = __DIR__ . '/' . $file;

      resizeImage($target, $target, 400, 400);
    }
  }
