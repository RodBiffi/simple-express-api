const express         = require('express');
const path            = require('path');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const sassMiddleware  = require('node-sass-middleware');
const swagger         = require('swagger-express-middleware');
const swaggerUi       = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger.json');

//Routes
const evenodd   = require('./routes/evenodd');
const newnumber = require('./routes/newnumber');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src:            path.join(__dirname, 'public'),
    dest:           path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap:      true
}));

app.use(express.static(path.join(__dirname, 'public')));

//serving Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//configuring swagger middleware parsing and validation
swagger(path.join(__dirname, 'api/swagger.json'), app, function(err, middleware) {
    app.enable('case sensitive routing');
    app.enable('strict routing');
    app.use(middleware.metadata());
    app.use(middleware.parseRequest());
    app.use(middleware.validateRequest());

    let urlPrefix = process.env.npm_package_urlPrefix;
    let urlRoot   = '/' + urlPrefix;
    app.use(urlRoot + '/evenodd', evenodd);
    app.use(urlRoot + '/newnumber', newnumber);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        let err    = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error   = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
});

module.exports = app;
