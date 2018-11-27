module.exports = `<div class="container mt-2">
						<form action="/dashboard/search" class="form-group row" method="get" accept-charset="utf-8">
							<div class="col-sm-3">
								<label for="exampleInputEmail1">Tên Package</label>
								<input type="text" name="package" placeholder="Tên package..." class="form-control">
							</div>
							<div class="col-sm-3">
								<label for="exampleInputEmail1">Model</label>
								<select class="custom-select" name="model">
								  <option selected value="MIA1">MIA1</option>
								</select>
							</div>
							<div class="col-sm-3">
								<label for="exampleInputEmail1">CPU</label>
								<select class="custom-select" name="cpu">
								  <option selected value="Unknown">Không xác định</option>
								  <option value="1">1</option>
								  <option value="2">2</option>
								</select>
							</div>
							<div class="col-sm-3">
								<label for=""></label>
								<button type="submit" class="form-control btn btn-primary mt-2">Tìm Kiếm</button>
							</div>
						</form>
					</div>`