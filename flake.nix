{
  description = "A snippet for every React hook — consumable as a Neovim plugin via LuaSnip";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs =
    { self, nixpkgs }:
    let
      systems = [
        "aarch64-darwin"
        "x86_64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
      version = (builtins.fromJSON (builtins.readFile ./package.json)).version;
    in
    {
      packages = forAllSystems (pkgs: rec {
        react-hooks-snippets = pkgs.vimUtils.buildVimPlugin {
          pname = "react-hooks-snippets";
          inherit version;
          src = self;
        };
        default = react-hooks-snippets;
      });

      overlays.default = final: prev: {
        vimPlugins = prev.vimPlugins // {
          react-hooks-snippets = final.vimUtils.buildVimPlugin {
            pname = "react-hooks-snippets";
            inherit version;
            src = self;
          };
        };
      };
    };
}
