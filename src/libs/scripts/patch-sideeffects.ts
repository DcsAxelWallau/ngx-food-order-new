(function() {
  const fs = require('fs');
  const path = require('path');
  const root = process.cwd();

  console.log('patching sideEffects=false into safe packages ...');

  ['rxjs', 'ramda'].forEach(packageName => {
    const fileName = path.join(root, 'node_modules', packageName, 'package.json');
    const file: { [key: string]: any } = require(fileName);

    file.sideEffects = false;

    fs.writeFileSync(fileName, JSON.stringify(file, undefined, 2), function(err: any) {
      if (err) {
        return console.log(err);
      }
      console.log('writing to ' + fileName);
    });
  });

  console.log('finished');
})();
