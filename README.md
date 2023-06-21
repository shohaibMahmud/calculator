# calculator
This is a simple calculator implemented as the finaly project in the foundation course of TOP. In addition to the project's functionality, a minidisplay for the previous operations and a sign button were added.

1. Maximum length an operand can have is 28. Since the calculator takes input beyond the safe value supported by JS, results could be inaccurate.

2. If the minidisplay reaches its character limit, the display will freeze and show three dots "..." at the end to specify some operations have been clipped at the end.

3. Any attempt to input a number before specifying an operation will erase an existing chain of operations. If there is no chain, there will be no effect.

4. Rounding functionality was not tested as JS loses precision beyond the safe value.
