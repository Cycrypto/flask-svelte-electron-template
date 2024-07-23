from flask import Blueprint

main = Blueprint('main', __name__)

from .controller import *
from .converter import *
from .crawler import *
from .dto import *
from .model import *
from .repository import *
from .service import *
