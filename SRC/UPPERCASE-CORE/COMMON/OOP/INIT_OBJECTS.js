/**
 * 모든 정의된 싱글톤 객체의 초기화를 수행합니다.
 */
global.INIT_OBJECTS = METHOD({

	run : () => {

		OBJECT.initObjects();
	}
});
