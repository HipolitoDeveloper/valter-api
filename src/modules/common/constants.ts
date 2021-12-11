export default class Constants {
	//PATHS
	static readonly BASE_DIR = __dirname + '/';

	static readonly UPLOAD_DIR = __dirname + '/assets/uploads/';
	static readonly DATA_DIR = __dirname + '/assets/data/';
	static readonly PATH_ASSETS_CONFIG = __dirname + '/assets/config/';

	//USERS TYPE
	static readonly USER_TYPE_ADMIN = 0;
	static readonly USER_TYPE_DRIVER = 1;
	static readonly SYSTEM_CLIENT_ID = 12;

	//OBJECT STATUS
	static readonly OBJECT_STATUS_ACTIVE = 0;
	static readonly OBJECT_STATUS_INACTIVE = 1;
	static readonly OBJECT_STATUS_DELETED = 2;
	static readonly OBJECT_STATUS_PROCESSED = 3;
	static readonly OBJECT_STATUS_PENDING = 4;

	//ALERTS
	static readonly ALERTS_ENABLED = true;
	static readonly TEMPO_MINIMO_ALERTAS = 2;

	//SUCESSOS
	static readonly  SYSTEM_SUCCESS_USER_SIGNUP_MESSAGE =
	'Usuário cadastrado com sucesso'

	static readonly  SYSTEM_SUCCESS_USER_SIGNIN_MESSAGE =
	'Usuário foi autenticado com sucesso'

	static readonly  SYSTEM_SUCCESS_USER_SENDEMAIL_MESSAGE =
	'O E-mail de redefinição foi enviado'

	static readonly  SYSTEM_SUCCESS_USER_RESETPASSWORD_MESSAGE =
	'A senha foi redefinida.'




	//ERROS
	static readonly SYSTEM_ERRO_DUPLICATED_USER_CODE = 11000;
	static readonly SYSTEM_ERRO_DUPLICATED_USER_MESSAGE =
    'Esse e-mail já está sendo utilizado.';

	static readonly SYSTEM_ERRO_USER_NOTFOUND_CODE = 700;
	static readonly SYSTEM_ERRO_USER_NOTFOUND_MESSAGE =
		'Usuário não encontrado. Verifique os dados e tente novamente.';

    static readonly SYSTEM_ERRO_USER_INVALIDPASSWORD_CODE = 701;
	static readonly SYSTEM_ERRO_USER_INVALIDPASSWORD_MESSAGE =
		'Senha inválida. Verifique os dados e tente novamente.';

	static readonly SYSTEM_ERRO_USER_NOTCREATED_CODE = 702;
	static readonly SYSTEM_ERRO_USER_NOTCREATED_MESSAGE =
		'Senha inválida. Verifique os dados e tente novamente.';

	static readonly SYSTEM_ERRO_UNSEND_EMAIL_CODE = 800;
	static readonly SYSTEM_ERRO_UNSEND_EMAIL_MESSAGE =
		'Não foi possível enviar o e-mail de redefinição. Verifique os dados e tente novamente.';


	
}
