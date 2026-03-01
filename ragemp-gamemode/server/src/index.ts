import { bootstrap, runtime } from './core/bootstrap';

bootstrap();

runtime.ensureSession(1);
runtime.simulateRemote(1, 'ui:auth:register', 'player1', 'secret123');
runtime.simulateRemote(1, 'ui:auth:login', 'player1', 'secret123');
runtime.simulateRemote(1, 'player:command', '/setmoney 1 5000');
