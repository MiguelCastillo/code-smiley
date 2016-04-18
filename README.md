# code-smiley
Khan Project

# Instructions

To load the project and see it run you can just run `$ npm install && grunt serve-site`.  That should load things up.

To walk the code, you can start with [index.js](https://github.com/MiguelCastillo/code-smiley/blob/master/src/index.js). That's the main app entry. That's where we setup the whitelist, blacklist, and structure rules in the sample application.

The whitelist, blacklist, and structure rules are managed by the module [CodeSmiley.js](https://github.com/MiguelCastillo/code-smiley/blob/master/src/CodeSmiley.js), which configures the underlying validation engine, collects results, and transforms them so that we display the information in a somewhat consumable format to the user.

The underlying validation engine is encapsulated in [Validation.js](https://github.com/MiguelCastillo/code-smiley/blob/master/src/validation/Validation.js), which is where we make calls into acorn to parse the input code and accumulate results from all the different configured validation rules.

The validation rules used in this sample project are defined in [rules](https://github.com/MiguelCastillo/code-smiley/tree/master/src/rules).

# Build

## Install
```
$ npm install
$ grunt build
```

## Running unit test
```
$ grunt test
```

## Serving up site
```
$ grunt serve-site
```

## Serving up unit tests
```
$ grunt serve-test
```

# API

## CodeSmiley
This is the main module that exposes an API for registering whitelist, blacklist, and code structure rules.

### exclude(tokenName)

Method to add a token name as *NOT* allowed (blacklist). Valid inputs are listed in the Token List table below; valid values are in the `name` column.

- **`param`** { string | string[] } tokenName - Name(s) of tokens to flag as not allowed


### include(tokenName)

Method to add a token name as allowed (whitelist). Valid inputs are listed in the Token List table below; valid values are in the `name` column.

- **`param`** { string | string[] } tokenName - Name(s) of tokens to flag as allowed

### structure(tree)

Method to add a JSON structure to define the shape of valid source code.

- **`param`** { object } tree - JSON object to specify a valid code structure


# Example

``` javascript
import Validation from "./CodeSmiley";

var validation = new Validation();

validation
  .include(["variable declaration", "if statement"])
  .exclude(["while statement"])
  .structure({
    "for statement": {
      "variable declaration": {}
    }
  });

validation.parse("var x = 10;");
```

# Screenshot

<img src="https://raw.githubusercontent.com/MiguelCastillo/code-smiley/master/images/screenshot.png?token=ABY-JefqYpH9tctRbajv0d452Euy90cpks5XG7cLwA%3D%3D" width="50%"></img>


# Token List

|Name|code|
|----|----|
|block statement|BlockStatement|
|program|Program|
|statement|Statement|
|empty statement|EmptyStatement|
|parenthesized expression|ParenthesizedExpression|
|expression statement|ExpressionStatement|
|if statement|IfStatement|
|labeled statement|LabeledStatement|
|continue statement|ContinueStatement|
|break statement|BreakStatement|
|with statement|WithStatement|
|switch statement|SwitchStatement|
|yield expression|YieldExpression|
|return statement|ReturnStatement|
|spread element|SpreadElement|
|throw statement|ThrowStatement|
|try statement|TryStatement|
|do while statement|DoWhileStatement|
|while statement|WhileStatement|
|for statement|ForStatement|
|for of statement|ForOfStatement|
|for in statement|ForInStatement|
|for init|ForInit|
|debugger statement|DebuggerStatement|
|function declaration|FunctionDeclaration|
|variable declaration|VariableDeclaration|
|variable declarator|VariableDeclarator|
|function|Function|
|scope body|ScopeBody|
|scope expression|ScopeExpression|
|pattern|Pattern|
|variable pattern|VariablePattern|
|member pattern|MemberPattern|
|rest element|RestElement|
|array pattern|ArrayPattern|
|object pattern|ObjectPattern|
|expression|Expression|
|meta property|MetaProperty|
|super|Super|
|this expression|ThisExpression|
|array expression|ArrayExpression|
|object expression|ObjectExpression|
|arrow function expression|ArrowFunctionExpression|
|function expression|FunctionExpression|
|template literal|TemplateLiteral|
|sequence expression|SequenceExpression|
|update expression|UpdateExpression|
|unary expression|UnaryExpression|
|logical expression|LogicalExpression|
|binary expression|BinaryExpression|
|assignment pattern|AssignmentPattern|
|assignment expression|AssignmentExpression|
|conditional expression|ConditionalExpression|
|call expression|CallExpression|
|new expression|NewExpression|
|member expression|MemberExpression|
|export default declaration|ExportDefaultDeclaration|
|export named declaration|ExportNamedDeclaration|
|export all declaration|ExportAllDeclaration|
|import declaration|ImportDeclaration|
|literal|Literal|
|identifier|Identifier|
|import namespace specifier|ImportNamespaceSpecifier|
|import default specifier|ImportDefaultSpecifier|
|import specifier|ImportSpecifier|
|tagged template expression|TaggedTemplateExpression|
|class expression|ClassExpression|
|class declaration|ClassDeclaration|
|class|Class|
|property|Property|
|method definition|MethodDefinition|
