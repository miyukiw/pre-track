# pre-track
mock for movie shoot on Sunday!

## How to Run
```
npm install
bower install
grunt serve
```

## Build to Heroku

### setup
create heroku remote
https://devcenter.heroku.com/articles/git#creating-a-heroku-remote

Then add the path to `buildcontrol` setting in `Gruntfile.js`
```
    buildcontrol: {
      heroku: {
        options: {
          remote: 'https://git.heroku.com/<heroku_app_name>.git',
          branch: 'master'
        }
      },
```

### build
```
grunt build
grunt buildcontrol:heroku
```

## Links for design

### Material Icons
https://design.google.com/icons/

### bootstrap-material-design
http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html

### Material Design Lite
http://www.getmdl.io/components/index.html
