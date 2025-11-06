using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Serialization;
<<<<<<< HEAD
using Umbraco.Cms.Core.Services;

namespace Umbraco.Cms.Core.PropertyEditors.Validators;

internal class RichTextRegexValidator : IRichTextRegexValidator
=======

namespace Umbraco.Cms.Core.PropertyEditors.Validators;

internal sealed class RichTextRegexValidator : IRichTextRegexValidator
>>>>>>> v10/contrib_Merge20251106_Try
{
    private readonly RegexValidator _regexValidator;
    private readonly IJsonSerializer _jsonSerializer;
    private readonly ILogger<RichTextRegexValidator> _logger;

    public RichTextRegexValidator(
        IJsonSerializer jsonSerializer,
<<<<<<< HEAD
        ILogger<RichTextRegexValidator> logger,
        RegexValidator regexValidator)
    {
        _jsonSerializer = jsonSerializer;
        _logger = logger;
        _regexValidator = regexValidator;
=======
        ILogger<RichTextRegexValidator> logger)
    {
        _jsonSerializer = jsonSerializer;
        _logger = logger;
        _regexValidator = new RegexValidator();
>>>>>>> v10/contrib_Merge20251106_Try
    }

    public IEnumerable<ValidationResult> ValidateFormat(object? value, string? valueType, string format) => _regexValidator.ValidateFormat(GetValue(value), valueType, format);

    private object? GetValue(object? value) =>
        RichTextPropertyEditorHelper.TryParseRichTextEditorValue(value, _jsonSerializer, _logger, out RichTextEditorValue? richTextEditorValue)
            ? richTextEditorValue?.Markup
            : value;
}
