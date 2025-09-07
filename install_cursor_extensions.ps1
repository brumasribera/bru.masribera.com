# PowerShell script to install VS Code extensions in Cursor
Write-Host "Installing VS Code extensions in Cursor..." -ForegroundColor Green

# List of third-party extensions from your VS Code installation
$extensions = @(
    "archsense.architecture-view-nestjs",
    "ashinzekene.nestjs", 
    "brunnerh.file-properties-viewer",
    "burkeholland.simple-react-snippets",
    "christian-kohler.path-intellisense",
    "codezombiech.gitignore",
    "dbaeumer.vscode-eslint",
    "donjayamanne.githistory",
    "dsznajder.es7-react-js-snippets",
    "eamodio.gitlens",
    "esbenp.prettier-vscode",
    "evondev.indent-rainbow-palettes",
    "figma.figma-vscode-extension",
    "file-icons.file-icons",
    "formulahendry.auto-rename-tag",
    "foxundermoon.shell-format",
    "github.copilot",
    "github.copilot-chat",
    "glenn2223.live-sass",
    "gruntfuggly.todo-tree",
    "iliazeus.vscode-ansi",
    "influrium.haxe-jsx",
    "jannisx11.batch-rename-extension",
    "jasonn-porch.gitlab-mr",
    "jayfong.generate-index",
    "kisstkondoros.vscode-gutter-preview",
    "mgmcdermott.vscode-language-babel",
    "mhutchie.git-graph",
    "mikeburgh.xml-format",
    "mikestead.dotenv",
    "mohd-akram.vscode-html-format",
    "naumovs.color-highlight",
    "nrwl.angular-console",
    "octref.vetur",
    "orsenkucher.vscode-graphql",
    "prisma.prisma",
    "shd101wyy.markdown-preview-enhanced",
    "streetsidesoftware.code-spell-checker",
    "tabnine.tabnine-vscode",
    "unifiedjs.vscode-mdx",
    "vincaslt.highlight-matching-tag",
    "vscode-icons-team.vscode-icons",
    "vue.volar",
    "waderyan.gitblame",
    "whtouche.vscode-js-console-utils",
    "yzhang.markdown-all-in-one"
)

$successCount = 0
$failCount = 0

foreach ($extension in $extensions) {
    try {
        Write-Host "Installing $extension..." -ForegroundColor Yellow
        $result = cursor --install-extension $extension 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Successfully installed $extension" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "✗ Failed to install $extension" -ForegroundColor Red
            $failCount++
        }
    } catch {
        Write-Host "✗ Error installing $extension : $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

Write-Host "`nInstallation Summary:" -ForegroundColor Cyan
Write-Host "Successfully installed: $successCount extensions" -ForegroundColor Green
Write-Host "Failed to install: $failCount extensions" -ForegroundColor Red
Write-Host "`nNote: Some extensions may require Cursor to be restarted to work properly." -ForegroundColor Yellow

Read-Host "Press Enter to continue"
