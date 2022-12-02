const navbar = `
<nav class="navbar navbar-expand-xl navbar-dark bg-dark">
<a class="navbar-brand" href="/student">Student</a>
<button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation"></button>
<div class="collapse navbar-collapse" id="collapsibleNavId">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
            <a class="nav-link" href="/student">Home<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/student/add">Add</a>
        </li>
    </ul>
</div>
</nav>
`;
module.exports = navbar;