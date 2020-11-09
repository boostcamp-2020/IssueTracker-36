module.exports = {
  /**
   * 앱 설정
   */
  apps: [
    {
      name: 'server',
      script: 'backend/bin/www', // 앱 실행 스크립트
      instances: 0, // 앱 인스턴스의 수. 0이면 CPU수만큼 생성
      exec_mode: 'cluster', // 실행 모드.
      env: {
        // 환경변수. 모든 배포 환경에서 공통으로 사용한다.
        NODE_ENV: 'production',
      },
    },
  ],

  /**
   * 배포 설정
   */
  deploy: {
    /** 백엔드 */
    backend: {
      key: '~/.ssh/issue_tracker', // ssh key path
      user: 'root', // 접속할 계정. SSH를 사용해서 서버에 접속할 수 있어야 한다.
      host: [
        {
          host: '106.10.55.14', // 서버 도메인 또는 IP
          port: '5556',
        },
      ],
      ref: 'origin/feat/deploy', // 서버에서 clone할 브랜치
      repo: 'git@github.com:boostcamp-2020/IssueTracker-36.git', // Git 저장소 URL
      ssh_options: 'StrictHostKeyChecking=no', // SSH 접속 옵션.
      path: '/home', // 앱을 설치할 폴더 위치
      // PM2가 배포(git clone)한 후 실행할 명령어
      'post-deploy':
        'cd backend && npm install --production && cd .. && pm2 reload ecosystem.config.js --env production',
    },
    /** 프론트엔드 */
    frontend: {
      key: '~/.ssh/issue_tracker', // ssh key path
      user: 'root', // 접속할 계정. SSH를 사용해서 서버에 접속할 수 있어야 한다.
      host: [
        {
          host: '106.10.55.14', // 서버 도메인 또는 IP
          port: '5555',
        },
      ],
      ref: 'origin/feat/deploy', // 서버에서 clone할 브랜치
      repo: 'git@github.com:boostcamp-2020/IssueTracker-36.git', // Git 저장소 URL
      ssh_options: 'StrictHostKeyChecking=no', // SSH 접속 옵션.
      path: '/home', // 앱을 설치할 폴더 위치
      'post-deploy': 'cd frontend && npm install --production && npm run build', // PM2가 배포(git clone)한 후 실행할 명령어
    },
  },
};
