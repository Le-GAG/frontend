<?php
// Website base URL
$baseUrl = rtrim(dirname($_SERVER['PHP_SELF']), '/') . '/';

// Load webpack assets list
$webpackAssetsFile = 'assets/generated-assets-files.json';
if (!file_exists($webpackAssetsFile)) {
  die('Error : ' . $webpackAssetsFile . ' doesn\'t exist. => <code>npm run dev</code>');
}
$webpackAssets = json_decode(file_get_contents($webpackAssetsFile), true);

?><!doctype html>
<html lang="fr">
<head>
  <title>Le GAG</title>
  <base href="<?php echo $baseUrl ?>">

  <meta charset="UTF-8">
  <meta name=viewport content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <?php foreach ($webpackAssets['files']['chunks']['app']['css'] as $cssFile): ?>
    <link rel="stylesheet" href="<?= $cssFile ?>"/>
  <?php endforeach; ?>
</head>
<body>
  <div id="app"></div>
  <script src="<?= $webpackAssets['files']['chunks']['app']['entry'] ?>"></script>
</body>
</html>
