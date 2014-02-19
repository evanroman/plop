plop
====

A Blog CMS that uses SQLite locally for storage. Designed to unintrusively integrate with existing express projects. Ativnos uses Plop for its development blog
See ativnos.org/dev

Design
====
Plop uses javascript variables to store user data by default. This allows the deployer to easily implement whatever user management and session system they prefer to use. For example, Ativnos uses MongoDB for user data and Redis for sessions.


