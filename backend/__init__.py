from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, migrate


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    from .main.controller import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
