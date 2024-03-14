import AutoGitUpdate from 'auto-git-update';

const config = {
    repository: 'https://github.com/chegele/BackupPurger',
    tempLocation: 'C:/Users/scheg/Desktop/tmp/',
    ignoreFiles: ['util/config.js'],
    executeOnComplete: 'C:\\Users\\scheg\\Desktop\\worksapce\\AutoGitUpdate\\startTest.bat',
    exitOnComplete: true
}

const updater = new AutoGitUpdate(config);

updater.autoUpdate();